import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import FormOne from '.';
import userEvent from "@testing-library/user-event";
import { store } from '../../redux/store';

describe('FormOne Component Tests', () => {

    const mockNextStep = vi.fn();
    const mockPrevStep = vi.fn();

    const renderWithProvider = (component) => {
        return render(<Provider store={store}>{component}</Provider>);
    };

    it('renders the form fields correctly', () => {
        renderWithProvider(<FormOne nextStep={mockNextStep} prevStep={mockPrevStep} />);

        expect(screen.getByTestId('name')).toBeInTheDocument();
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('confirm')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    });

    it('shows validation errors when required fields are empty and form is submitted', async () => {

        const user = userEvent.setup();
        renderWithProvider(<FormOne nextStep={mockNextStep} prevStep={mockPrevStep} />);

        // Submit the form
        await user.click(screen.getByRole('button', { name: /Next/i }));

        const nameError = screen.getByTestId('nameerror');
        const emailError = screen.getByTestId('emailError');
        const passwordError = screen.getByTestId('passwordError');
        const confirmError = screen.getByTestId('confirmError');

        await waitFor(() => {
            expect(nameError).toBeInTheDocument();
            expect(nameError).toHaveTextContent(/Name is required/i);
            expect(emailError).toBeInTheDocument();
            expect(emailError).toHaveTextContent(/Email is required/i);
            expect(passwordError).toBeInTheDocument();
            expect(passwordError).toHaveTextContent(/Password is required/i);
            expect(confirmError).toBeInTheDocument();
            expect(confirmError).toHaveTextContent(/Confirm password is required/i);
        });

    });

    it('shows error message when passwords do not match', async () => {
        renderWithProvider(<FormOne nextStep={mockNextStep} prevStep={mockPrevStep} />);

        fireEvent.change(screen.getByTestId('name'), { target: { value: 'JohnDoe' } });
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'johndoe@example.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123' } });
        fireEvent.change(screen.getByTestId('confirm'), { target: { value: 'Password456' } });

        const submitButton = screen.getByRole('button', { name: /Next/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Passwords doesn't match/i)).toBeInTheDocument();
        });
    });

    it('enables submit button when form is valid', async () => {
    renderWithProvider(<FormOne nextStep={mockNextStep} prevStep={mockPrevStep} />);

        fireEvent.change(screen.getByTestId('name'), { target: { value: 'JohnDoe' } });
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123' } });
        fireEvent.change(screen.getByTestId('confirm'), { target: { value: 'Password123' } });

        const submitButton = screen.getByRole('button', { name: /Next/i });
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockNextStep).toHaveBeenCalled();
        });
    });
});

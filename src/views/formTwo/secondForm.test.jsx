import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import FromTwo from '.';
import userEvent from '@testing-library/user-event';

describe("Second From Component", () => {
    const mockNextStep = vi.fn();
    const mockPrevStep = vi.fn();

    beforeEach(() => {
        mockNextStep.mockClear(); // Reset the mock function before each test
        mockPrevStep.mockClear(); // Reset the mock function before each test
    });

    // Helper to render with Redux provider
    const renderWithProvider = (component) => {
        return render(<Provider store={store}>{component}</Provider>);
    };

    it('renders the second form fields correctly', () => {
        renderWithProvider(<FromTwo nextStep={mockNextStep} prevStep={mockPrevStep} />);

        // Check if the input fields and labels are rendered
        expect(screen.getByTestId(/mobileNo/i)).toBeInTheDocument();
        expect(screen.getByTestId(/dobdate/i)).toBeInTheDocument();
        expect(screen.getByTestId(/usergender/i)).toBeInTheDocument();
        expect(screen.getByTestId(/userbio/i)).toBeInTheDocument();
    });

    // it('disable submit button on initial/when form is invalid', async () => {
    //     renderWithProvider(<FromTwo nextStep={mockNextStep} prevStep={mockPrevStep} />);

    //     const submitButton = screen.getByRole('button', { name: /Next/i });
    //     expect(submitButton).toBeDisabled();
    // });

    it('shows validation errors when required fields are empty and form is submitted', async () => {

        const user = userEvent.setup();
        renderWithProvider(<FromTwo nextStep={mockNextStep} prevStep={mockPrevStep} />);

        // Submit the form
        await user.click(screen.getByRole('button', { name: /Next/i }));

        const mobileError = screen.getByTestId('mobileerror');
        const dobError = screen.getByTestId('dateerror');
        const genderError = screen.getByTestId('gendererror');
        const bioError = screen.getByTestId('bioerror');

        await waitFor(() => {
            expect(mobileError).toBeInTheDocument();
            expect(mobileError).toHaveTextContent(/Mobile is required/i);
            expect(dobError).toBeInTheDocument();
            expect(dobError).toHaveTextContent(/Invalid date/i);
            expect(genderError).toBeInTheDocument();
            expect(genderError).toHaveTextContent(/Select gender/i);
            expect(bioError).toBeInTheDocument();
            expect(bioError).toHaveTextContent(/Bio is required/i);
        });
    });


    it('enables submit button when form is valid', async () => {
        renderWithProvider(<FromTwo nextStep={mockNextStep} prevStep={mockPrevStep} />);

        fireEvent.change(screen.getByTestId('mobileNo'), { target: { value: '9875463210' } });
        fireEvent.change(screen.getByTestId('dobdate'), { target: { value: new Date().getTime() } });
        const GenderField = screen.getByTestId('usergender');
        expect(GenderField).toHaveTextContent("Male")
        fireEvent.change(screen.getByTestId('userbio'), { target: { value: 'A small description about me' } });

        const submitButton = screen.getByRole('button', { name: /Next/i });
        expect(submitButton).toBeEnabled();
    });

});
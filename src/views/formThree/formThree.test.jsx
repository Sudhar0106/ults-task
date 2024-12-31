import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import userEvent from '@testing-library/user-event';
import FromThree from '.';

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
        renderWithProvider(<FromThree nextStep={mockNextStep} prevStep={mockPrevStep} />);

        // Check if the input fields and labels are rendered
        expect(screen.getByTestId(/add-line1/i)).toBeInTheDocument();
        expect(screen.getByTestId(/add-line2/i)).toBeInTheDocument();
        expect(screen.getByTestId(/user-state/i)).toBeInTheDocument();
        expect(screen.getByTestId(/user-country/i)).toBeInTheDocument();
    });

    // it('disable submit button on initial/when form is invalid', async () => {
    //     renderWithProvider(<FromThree nextStep={mockNextStep} prevStep={mockPrevStep} />);

    //     const submitButton = screen.getByRole('button', { name: /Submit/i });
    //     expect(submitButton).toBeDisabled();
    // });

    it('shows validation errors when required fields are empty and form is submitted', async () => {

        const user = userEvent.setup();
        renderWithProvider(<FromThree nextStep={mockNextStep} prevStep={mockPrevStep} />);

        // Submit the form
        
        const lineOneError = screen.getByTestId('line1error');
        const lineTwoError = screen.getByTestId('line2error');
        const stateError = screen.getByTestId('stateerror');
        const countryError = screen.getByTestId('countryerror');
        
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(lineOneError).toBeInTheDocument();
            expect(lineOneError).toHaveTextContent(/This field is required/i);
            expect(lineTwoError).toBeInTheDocument();
            expect(lineTwoError).toHaveTextContent(/This field is required/i);
            expect(stateError).toBeInTheDocument();
            expect(stateError).toHaveTextContent(/Select state/i);
            expect(countryError).toBeInTheDocument();
            expect(countryError).toHaveTextContent(/Select country/i);
        });
    });


    it('enables submit button when form is valid', async () => {
        renderWithProvider(<FromThree nextStep={mockNextStep} prevStep={mockPrevStep} />);

        fireEvent.change(screen.getByTestId('add-line1'), { target: { value: 'Ruecker Expressway' } });
        fireEvent.change(screen.getByTestId('add-line2'), { target: { value: 'New Roscoe' } });
        fireEvent.change(screen.getByTestId('user-state'), { target: { value: 'Kerala' } });
        fireEvent.change(screen.getByTestId('user-country'), { target: { value: 'India' } });

        const submitButton = screen.getByRole('button', { name: /Submit/i });
        expect(submitButton).toBeEnabled();
    });

});
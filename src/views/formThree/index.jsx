import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../redux/finalSubmision'
import axios from 'axios'

const Validationschema = z.object({
    line1: z.string({
        required_error: "This field is required"
    }),
    line2: z.string({
        required_error: "This field is required"
    }),
    state: z.string({
        required_error: "Select state"
    }),
    country: z.string({
        required_error: "Select country"
    }),
})

function FromThree({ toggler, prevStep, resetForm }) {
    const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm({
        resolver: zodResolver(Validationschema)
    })

    const dispatch = useDispatch()
    const stepOne = useSelector((state) => state.firstForm)
    const stepTwo = useSelector((state) => state.secondform)

    const onsubmit = async (data) => {
        dispatch(addUser({ ...stepOne, ...stepTwo, ...data }))
        toggler()
        resetForm(0)
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className="w-full mb-4">
                <label htmlFor="line1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 1</label>
                <Controller
                    control={control}
                    name='line1'
                    id="line1"
                    render={({ field }) => (
                        <Input {...field}
                            type="text"
                            data-testid='add-line1'
                            className='border border-gray-300 rounded-lg'
                            placeholder="Enter your address"
                        />
                    )}
                />
                <span data-testid='line1error' className='text-red-500 text-sm'>{errors.line1 && errors.line1.message}</span>
            </div>
            <div className="w-full mb-4">
                <label htmlFor="line2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 2</label>
                <Controller
                    control={control}
                    name='line2'
                    id="line2"
                    render={({ field }) => (
                        <Input {...field}
                            type="text"
                            data-testid='add-line2'
                            className='border border-gray-300 rounded-lg'
                            placeholder="Enter your address"
                        />
                    )}
                />
                <span data-testid='line2error' className='text-red-500 text-sm'>{errors.line2 && errors.line2.message}</span>
            </div>
            <div className="w-full mb-4">
                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                <Controller
                    control={control}
                    name='state'
                    render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                            <SelectTrigger data-testid='user-state'>
                                <SelectValue id="state" placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Kerala">Kerala</SelectItem>
                                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <span data-testid='stateerror' className='text-red-500 text-sm'>{errors.state && errors.state.message}</span>
            </div>
            <div className="w-full mb-4">
                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                <Controller
                    control={control}
                    name='country'
                    render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                            <SelectTrigger data-testid='user-country'>
                                <SelectValue id="country" placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="India">India</SelectItem>
                                <SelectItem value="US">US</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <span data-testid='countryerror' className='text-red-500 text-sm'>{errors.country && errors.country.message}</span>
            </div>


            <div className='flex justify-end gap-4 my-4 items-center'>
                <Button type="button"
                    variant="secondary"
                    className='flex justify-center items-center gap-2 w-fit'
                    onClick={() => prevStep()}>
                    <ArrowLeft size={20} />
                    Previous
                </Button>
                <Button type="submit">
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default FromThree
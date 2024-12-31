import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux'
import { firstForm } from '../../redux/firstForm'

const Validationschema = z.object({
    name: z.string({
        required_error: "Name is required"
    }).regex(/[A-z0-9_]+$/, "only alpha-numeric char are allowed."),
    email: z.string({
        required_error: "Email is required"
    }).email(),
    password: z.string({
        required_error: "Password is required"
    })
        .min(8, { message: "Password is too short" })
        .max(20, { message: "Password is too long" }),
    conpassword: z.string({
        required_error: "Confirm password is required"
    }),

}).refine((data) => data.password === data.conpassword, {
    message: "Passwords doesn't match",
    path: ["conpassword"],
});

function FormOne({ nextStep, prevStep }) {

    const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm({
        mode: "onChange",
        resolver: zodResolver(Validationschema),
    })
    const dispatch = useDispatch()

    const [show, setshow] = useState(false);
    const toggle = () => setshow(!show);

    const [Conshow, setConshow] = useState(false);
    const toggleCon = () => setConshow(!Conshow);

    const onsubmit = async (data) => {
        // alert('Form submitted successfully')
        await dispatch(firstForm(data))
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className="w-full mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                <Controller
                    control={control}
                    name='name'
                    render={({ field }) => (
                        <Input {...field}
                            type="text"
                            data-testid="name"
                            className='border border-gray-300 rounded-lg'
                            placeholder="Enter your name"
                        />
                    )}
                />
                <span data-testid="nameerror" className='text-red-500 text-sm'>{errors.name && errors.name.message}</span>
            </div>
            <div className="w-full mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <Controller
                    control={control}
                    name='email'
                    render={({ field }) => (
                        <Input {...field}
                            type="email"
                            data-testid="email"
                            className='border border-gray-300 rounded-lg'
                            placeholder="Enter your email"
                        />
                    )}
                />
                {errors.email && <span data-testid="emailError" className='text-red-500 text-sm'>{errors.email.message}</span>}
            </div>
            <div className='w-full mb-4'>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className='flex'>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input {...field}
                                type={show ? "text" : "password"}
                                placeholder="Password"
                                data-testid="password"
                                className="border-y border-l border-gray-300 rounded-s-md flex-1" />
                        )}
                    />

                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border-y border-r border-gray-300 rounded-none rounded-e-lg  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 cursor-pointer"
                        onClick={toggle}>
                        {show ? <Eye size={20} /> : <EyeOff size={20} />}
                    </span>
                </div>
                {errors.password && <span data-testid="passwordError" className='text-red-500 text-sm'>{errors.password.message}</span>}
            </div>
            <div className='w-full'>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <div className='flex'>
                    <Controller
                        control={control}
                        name="conpassword"
                        render={({ field }) => (
                            <Input {...field}
                                type={Conshow ? "text" : "password"}
                                data-testid="confirm"
                                placeholder="Confirm Password"
                                className="border-y border-lr border-gray-300 rounded-s-md flex-1" />
                        )}
                    />

                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border-y border-r border-gray-300 rounded-none rounded-e-lg  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 cursor-pointer"
                        onClick={toggleCon}>
                        {Conshow ? <Eye size={20} /> : <EyeOff size={20} />}
                    </span>
                </div>
                {errors.conpassword && <span data-testid="confirmError" className='text-red-500 text-sm'>{errors.conpassword.message}</span>}
            </div>

            <div className='flex justify-end my-4'>
                <Button type="submit" className='flex justify-center items-center gap-2 w-fit'
                    dispatch={!isValid || !isDirty}>
                    Next
                    <ArrowRight size={20} />
                </Button>
            </div>
        </form>
    )
}

export default FormOne
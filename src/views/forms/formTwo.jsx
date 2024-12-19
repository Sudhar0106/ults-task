import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import moment from 'moment/moment'
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, CalendarIcon } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import { useDispatch } from 'react-redux'

const Validationschema = z.object({
    mobile: z.string({
        required_error: "This field is required"
    }).regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'Invalid Number!')
        .min(8, { message: "Invalid Number" })
        .max(16, { message: "Invalid Number" }),
    date: z.coerce.date({
        required_error: "This field is required"
    }),
    bio: z.string({
        required_error: "This field is required"
    }),
    gender: z.string({
        required_error: "This field is required"
    }),
})

function FromTwo({ nextStep, prevStep }) {
    const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm({
        mode: "onTouched",
        resolver: zodResolver(Validationschema)
    })

    const onsubmit = async (data) => {
       
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className="w-full mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile No.</label>
                <Controller
                    control={control}
                    type="number"
                    name="mobile"
                    render={({ field }) => (
                        <Input {...field}
                            type="number"
                            className='border border-gray-300 rounded-lg'
                            placeholder="+91 00000-00000"
                        />
                    )}
                />
                {errors.mobile && <span className='text-red-500 text-sm'>{errors.mobile.message}</span>}
            </div>
            <div className='w-full mb-4'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                        moment(field.value).format("DD/MM/YYYY")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
                {errors.date && <span className='text-red-500 text-sm'>{errors.date.message}</span>}
            </div>
            <div className="w-full mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                <Controller
                    control={control}
                    name='gender'
                    render={({ field }) => (
                        <RadioGroup onChange={field.onChange} className='flex items-center gap-4'>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem name="gender" value="male" id="male" />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem name="gender" value="Female" id="Female" />
                                <label htmlFor="Female">Female</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem name="gender" value="others" id="others" />
                                <label htmlFor="others">Others</label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.gender && <span className='text-red-500 text-sm'>{errors.gender.message}</span>}
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                <Controller
                    control={control}
                    name='bio'
                    render={({ field }) => (
                        <Textarea id="bio"
                            {...field}
                            placeholder="Enter your bio" />
                    )}
                />
                {errors.website && <span className='text-red-500 text-sm'>{errors.website.message}</span>}
            </div>


            <div className='flex justify-end gap-4 my-4'>
                <Button type="button"
                    variant="secondary"
                    className='flex justify-center items-center gap-2 w-fit'
                    onClick={() => prevStep()}>
                    <ArrowLeft size={20} />
                    Previous
                </Button>
                <Button type="submit" className='flex justify-center items-center gap-2 w-fit'
                    disabled={!isValid || !isDirty}>
                    Next
                    <ArrowRight size={20} />
                </Button>
            </div>
        </form>
    )
}

export default FromTwo
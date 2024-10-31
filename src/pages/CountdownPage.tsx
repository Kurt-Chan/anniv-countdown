import CountdownItem from '@/components/CountdownItem'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { HeartSpinner } from 'react-spinners-kit';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email",
    }),
})


const CountdownPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<JSX.Element | null>(null)
    const [showLoader, setShowLoader] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setShowLoader(true)
        try {
            console.log(values)

        } catch (error) {
            console.error(error)
        }
        finally {
            form.reset()
            setShowLoader(false)
        }
    }


    useEffect(() => {
        const herName = localStorage.getItem('HerName');
        if (herName === "chanel" || herName === "kaye" || herName === "chanel cao-wat" || herName === "kaye chanel") {
            navigate('/wait')
        }
        else {
            navigate('/')
        }
    }, [])

    return (
        <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-t from-rose-900 via-pink-800 to-rose-900">
            <h1 className='text-3xl md:text-6xl font-bold text-white mb-4'>Oops! My bad 😅</h1>
            <h1 className='text-lg md:text-2xl font-medium text-white'>Come back after</h1>
            <div className="shadow-xl my-4 rounded-xl border-4 md:border-8 py-5 border-black flex w-80 md:w-full max-w-5xl items-center bg-white">
                <CountdownItem unit="Day" text="Days" />
                <CountdownItem unit="Hour" text="Hours" />
                <CountdownItem unit="Minute" text="Minutes" />
                <CountdownItem unit="Second" text="Seconds" />
            </div>
            <Dialog>
                <DialogTrigger className='px-4 py-3 bg-rose-950 hover:bg-pink-900 hover:scale-110 border-2 border-pink-200 font-body rounded-xl text-white text-xl my-4 flex justify-center items-center gap-2'>
                    <span className='flex justify-center items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                            <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                        </svg>
                        Notify me
                    </span>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle >I need your email</DialogTitle>
                        <DialogDescription>
                            Enter your email and it will send you a notification when the countdown timer is about to run out.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="youremail@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error}
                            <HeartSpinner color="#FF0000" loading={showLoader} />
                            {!showLoader && (<Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid}>Submit</Button>)}
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            <h1 className='text-md mt-5 font-light text-slate-300'>Prepared by Kurt 😉😘</h1>
        </section>
    )
}

export default CountdownPage
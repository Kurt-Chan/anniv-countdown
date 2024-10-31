import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import whoAreYou from '@/assets/wait-a-minute-who-are-you.gif'
import iDontKnow from '@/assets/i-dont-know-who-you-are-joyce-byers.gif'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { HeartSpinner } from 'react-spinners-kit'


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
})

const WhoAreYou = () => {
    const navigate = useNavigate()
    const [imgSrc, setImgSrc] = useState(whoAreYou)
    const [error, setError] = useState<JSX.Element | null>(null)
    const [showLoader, setShowLoader] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    const fetchUsername = (username: string) => {
        const herName = username.toLowerCase()
        return new Promise((resolve) => {
            if (herName === "chanel" || herName === "kaye" || herName === "chanel cao-wat" || herName === "kaye chanel") {
                setTimeout(() => {
                    resolve(true)
                }, 2000);
            }
            else {
                setTimeout(() => {
                    resolve(false)
                }, 2000);
            }
        })
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        setShowLoader(true)
        try {
            const res = await fetchUsername(values.username);
            if (res) {
                localStorage.setItem('HerName', values.username)
                navigate('/wait')
            }
            else {
                localStorage.setItem('HerName', values.username)
                setImgSrc(iDontKnow)
                console.error("I dont know who you are")
                setError(
                    <p className='text-sm text-center font-medium text-red-500' >
                        Sorry, I don't know who you are😔
                    </ p>
                )
                // removes the error message after 8s
                setTimeout(() => {
                    setError(null)
                }, 8000);
            }

        } catch (error) {
            console.error(error)
        }
        finally {
            form.reset()
            setShowLoader(false)
            setTimeout(() => {
                setImgSrc(whoAreYou)
            }, 3000)
        }
    }

    useEffect(() => {
        const herName = localStorage.getItem('HerName');
        if (herName === "chanel" || herName === "kaye" || herName === "chanel cao-wat" || herName === "kaye chanel") {
            navigate('/wait')
        }
    }, [])

    return (
        <section className="h-screen flex flex-col md:flex-row-reverse justify-center items-center gap-4 bg-pink-950">
            <Card className="w-[350px] md:w-[450px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-rose-900">Who's this?</CardTitle>
                    <CardDescription>This website is intended for one person only!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Who are you?</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is for verification purposes only
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error}
                            <HeartSpinner color="#FF0000" loading={showLoader} />
                            {!showLoader && (<Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid}>Submit</Button>)}
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <img src={imgSrc} alt="gif" className="w-[350px] rounded-xl border-2 border-white" />
        </section>
    )
}

export default WhoAreYou
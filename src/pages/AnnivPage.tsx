import MouseImageTrail from "@/components/MouseImageTrail";
// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartSpinner } from "react-spinners-kit";



const AnnivPage = () => {
    const navigate = useNavigate()
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const date = new Date();
    const now = date.toLocaleDateString()

    const imageUrls = [
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/tytzjjmunwol1ezslfuv.png',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/y3v15i89lmhhtmzieqlw.png',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/zszsz5cvb2kjitikiq4m.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/xdhvexcluekctrclkrqc.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/wshk1nj4irtrsinw3k44.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/l4asm905wlcf5jdmvjx5.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/fbwuybvzleyvrbijywyk.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/kg03rx5end96ckwryvho.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/h9ehr82flegoyc1lw6wx.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/ge2hbnhesjdb0cjsyczy.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/r2u4p4bcioqc4sf5xfg5.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/rohoqsm9xwydqlkz4puy.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/ikmgrfubdpvgbcfrpz5i.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/qjzrqy6hbu3orbno0lsl.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/i7tmohwnomihygjyppxa.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/a7uc2kgaf8iapkaophil.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/aoxilzijxqrcwmy8eyb6.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/znhsffd4xauvdjtiaayc.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/dlff77jcgsekkriohmyp.jpg',
        'https://res.cloudinary.com/dnhrwakmp/image/upload/v1730513507/anniv/yznhz7xo0dzfrysrh25w.jpg'
    ]

    const preloadImages = (urls: any) => {
        return Promise.all(
            urls.map((url: any) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            })
        );
    };

    useEffect(() => {
        console.log(now)

        if (now != "11/2/2024") { // must change to 11/18/2024 and change to date today
            navigate('/wait')
        }
        else {
            preloadImages(imageUrls)
                .then(() => setImagesLoaded(true))
                .catch((error) => console.error("Error preloading images:", error));
        }
    }, []);

    if (!imagesLoaded) {
        return (
            <div className="grid place-items-center h-screen w-full place-content-center bg-white">
                <HeartSpinner color="#FF0000" />
                <p>Loading images...</p>
            </div>
        );
    }

    return (
        <MouseImageTrail
            renderImageBuffer={60}
            rotationRange={25}
            images={imageUrls}
        >
            <section className="grid h-screen w-full place-content-center bg-white">
                <p className="flex flex-col items-center gap-2 text-3xl font-bold uppercase text-black">
                    <span>Hover your mouse</span>
                    <span className="text-sm font-normal text-center text-gray-600">
                        USE YOUR LAPTOP OR DESKTOP FOR BETTER EXPERIENCE
                    </span>
                </p>
            </section>
        </MouseImageTrail>
    );
}

export default AnnivPage
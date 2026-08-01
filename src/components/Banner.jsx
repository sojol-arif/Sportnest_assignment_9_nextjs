import Link from "next/link";

const Banner = () => {
    return (
        <div>
            <Link href="/products" className="primary_btn flex items-center justify-center transition-all duration-150">
                Book Now
            </Link>
        </div>
    );
};

export default Banner;
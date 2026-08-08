import MyFacilitiesManage from '@/components/MyFacilitiesManage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const ManageMyFacilities = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    ////console.log('user from manage my facilities page', user);

    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${user?.email}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const myFacilities = await res.json();
    //console.log('My facilities from my facilities page', myFacilities);

    return (
        <div className="min-h-screen bg-[#f4f6f2]">
            <MyFacilitiesManage myFacilities={myFacilities} />
        </div>
    );
};

export default ManageMyFacilities;
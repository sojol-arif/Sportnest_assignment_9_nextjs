import MyFacilitiesManage from '@/components/MyFacilitiesManage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const ManageMyFacilities = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    //console.log('user from manage my facilities page', user);

    const res = await fetch(`http://localhost:5000/facilities/${user?.email}`);
    const myFacilities = await res.json();
    console.log('My facilities from my facilities page', myFacilities);

    return (
        <div className="min-h-screen bg-[#f4f6f2]">
            <MyFacilitiesManage myFacilities={myFacilities} />
        </div>
    );
};

export default ManageMyFacilities;
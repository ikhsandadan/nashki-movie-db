"use server";
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

const Session = async () => {
    const session = await getServerSession(options);
    const accessToken = session?.accessToken;
    const userId = session?.userId;
    const user = session?.user;
    const idToken = session?.idToken;
    const email = session?.email;
    const picture = session?.picture;
    const country = session?.country;
    const firstName = session?.givenName;
    const middleName = session?.middleName;
    const familiyName = session?.familyName;
    const nickname = session?.nickname;
    const birthdate = session?.birthdate;
    const gender = session?.gender;
    const phoneNumber = session?.phoneNumber;
    const postalCode = session?.postalCode;
    const streetAddress = session?.streetAddress;
    const locality = session?.locality;
    
    return {
        accessToken, 
        idToken, 
        userId, 
        user, 
        email, 
        picture, 
        country, 
        firstName, 
        middleName, 
        familiyName, 
        nickname, 
        birthdate, 
        gender, 
        phoneNumber, 
        postalCode, 
        streetAddress, 
        locality
    };
}

export default Session;
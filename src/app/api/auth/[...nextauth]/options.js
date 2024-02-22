const PROVIDER_ATTRIBUTES_KEY = "custom";

const providerClientId = process.env.PROVIDER_CLIENT_ID;
const providerClientSecret = process.env.PROVIDER_CLIENT_SECRET;
const providerIssuer = process.env.PROVIDER_ISSUER;

const provider = {
    id: "affinidi",
    name: "Affinidi",
    clientId: providerClientId,
    clientSecret: providerClientSecret,
    type: "oauth",
    wellKnown: `${providerIssuer}/.well-known/openid-configuration`,
    authorization: {
        params: {
            prompt: "login",
            scope: "openid offline_access",
        },
    },
    client: {
        token_endpoint_auth_method: "client_secret_post",
    },
    idToken: true,
    profile(profile) {
        return {
            id: profile.sub,
            email: profile.custom?.find((i) => typeof i.email === "string")
            ?.email,
            picture: profile.custom?.find((i) => typeof i.picture === "string")
            ?.picture,
            country: profile.custom?.find((i) => typeof i.country === "string")
            ?.country,
            givenName: profile.custom?.find((i) => typeof i.givenName === "string")
            ?.giveNname,
            middleName: profile.custom?.find((i) => typeof i.middleName === "string")
            ?.middleName,
            familyName: profile.custom?.find((i) => typeof i.familyName === "string")
            ?.familyName,
            nickname: profile.custom?.find((i) => typeof i.nickname === "string")
            ?.nickname,
            birthdate: profile.custom?.find((i) => typeof i.birthdate === "string")
            ?.birthdate,
            gender: profile.custom?.find((i) => typeof i.gender === "string")
            ?.gender,
            phoneNumber: profile.custom?.find((i) => typeof i.phoneNumber === "string")
            ?.phoneNumber,
            postalCode: profile.custom?.find((i) => typeof i.postalCode === "string")
            ?.postalCode,
            streetAddress: profile.custom?.find((i) => typeof i.streetAddress === "string")
            ?.streetAddress,
            locality: profile.custom?.find((i) => typeof i.locality === "string")
            ?.locality,
        };
    },
};

export const options = {
    debug: true,
    session: { strategy: "jwt" },
    providers: [provider],
    callbacks: {
        // checks whether user is allowed to sign in
        async signIn({ account }) {
        return Boolean(
            account?.provider === provider.id &&
            account.access_token &&
            account.id_token
        );},
        // "account" and "profile" are only passed the first time this callback is called on a new session, after the user signs in
        // this defines how JWT is generated and is then used in session() callback as "token"
        async jwt({ token, account, profile }) {
        const profileItems = (profile)?.[PROVIDER_ATTRIBUTES_KEY];
        if (profile && profileItems) {
            let userDID;
            let user = {};
            userDID = profileItems.find(
                (item) => typeof item.did === "string"
            )?.did;
            user.email = profileItems.find(
                (item) => typeof item.email === "string"
            )?.email;
            user.picture = profileItems.find(
                (item) => typeof item.picture === "string"
            )?.picture;
            user.country = profileItems.find(
                (item) => typeof item.country === "string"
            )?.country;
            user.givenName = profileItems.find(
                (item) => typeof item.givenName === "string"
            )?.givenName;
            user.middleName = profileItems.find(
                (item) => typeof item.middleName === "string"
            )?.middleName;
            user.familyName = profileItems.find(
                (item) => typeof item.familyName === "string"
            )?.familyName;
            user.nickname = profileItems.find(
                (item) => typeof item.nickname === "string"
            )?.nickname;
            user.birthdate = profileItems.find(
                (item) => typeof item.birthdate === "string"
            )?.birthdate;
            user.gender = profileItems.find(
                (item) => typeof item.gender === "string"
            )?.gender;
            user.phoneNumber = profileItems.find(
                (item) => typeof item.phoneNumber === "string"
            )?.phoneNumber;
            user.postalCode = profileItems.find(
                (item) => typeof item.postalCode === "string"
            )?.postalCode;
            user.streetAddress = profileItems.find(
                (item) => typeof item.streetAddress === "string"
            )?.streetAddress;
            user.locality = profileItems.find(
                (item) => typeof item.locality === "string"
            )?.locality;
            token = {
            ...token,
            user,
            ...(userDID && { userId: userDID }),
            };
        }

        if (account) {
            token = {
            ...token,
            ...(account?.access_token && { accessToken: account.access_token }),
            ...(account?.id_token && { idToken: account.id_token }),
            };
        }

        return token;
        },
        // session is persisted as an HttpOnly cookie
        async session({ session, token }) {
            if (token.user && token.accessToken && token.idToken && token.userId) {
                return {
                    session,
                    ...(token.user && { user: { ...session.user, ...token.user } }),
                    ...(token.accessToken && { accessToken: token.accessToken }),
                    ...(token.idToken && { idToken: token.idToken }),
                    ...(token.userId && { userId: token.userId }),
                };
            }
        },
    },
};
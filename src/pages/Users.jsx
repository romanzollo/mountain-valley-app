import SignupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';

function NewUsers() {
    return (
        <>
            <Heading as="h1">Create a new user</Heading>

            {/* Форма регистрации */}
            <SignupForm />
        </>
    );
}

export default NewUsers;

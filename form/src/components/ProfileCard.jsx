export const ProfileCard = ({ user }) => {
    if (!user) {
        return (
            <div className="bg-gray-100 p-4 rounded text-center text-gray-400">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold text-indigo-600">
                Welcome, {user.firstName} 👋
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
        </div>
    );
};

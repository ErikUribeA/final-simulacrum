
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

const NavBar = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return <div>No has iniciado sesión</div>;
    }

    const user = session.user;

    return (
        <div>
            <div>
                <h2>Dashboard de Proyectos</h2>
            </div>
            <div>
                
                <h1>{user?.name}</h1>
                {user?.photo ? (
                    <Image src={user.photo} alt="Foto de perfil" width={100} height={100} />
                ) : (
                    <p>No se ha cargado la foto de perfil</p>
                )}
            </div>
        </div>
    );
};

export default NavBar;


import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import { Button } from "@mui/joy"
import { FaRegFileZipper } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";



const NavBar = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return <div>No has iniciado sesión</div>;
    }

    const user = session.user;

    return (
        <div className="w-full flex justify-between items-center p-3 bg-white">
            <div className="flex">
                <h2 className=" font-bold text-[1.8em]">Dashboard de Proyectos</h2>
            </div>
            <div className="flex gap-4 items-center">
                <Button sx={{ "bgcolor": "black", "display" : "flex", "gap" : "8px",  "&:hover": { backgroundColor: "black" } }}> <FaRegFileZipper className="text-[1.2em]" />
                    Descargar Reporte </Button>
                <Button sx={{ "bgcolor": "black", "display" : "flex", "gap" : "8px", "&:hover": { backgroundColor: "black" } }}> <GoPlusCircle className="text-[1.2em]" />
                    Nuevo Proyecto </Button>
                {user?.photo ? (
                    <Image
                        src={user.photo}
                        alt="Foto de perfil"
                        width={80} 
                        height={80} 
                        quality={100} 
                        className="rounded-full w-9 h-9"
                    />

                ) : (
                    <p>No se ha cargado la foto de perfil</p>
                )}
                <h1>{user?.name}</h1>
            </div>
        </div>
    );
};

export default NavBar;

import { HashLoader } from "react-spinners";

interface PropsP {
    size?: number; // Opcional
    color?: string; // Opcional
}

function Preloader({ size = 50, color = "#36d7b7" }: PropsP) {
    return (
        <div style={styles.loaderContainer}>
            <HashLoader color={color} loading={true} size={size} />
        </div>
    );
}

const styles = {
    loaderContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Hace que el contenedor ocupe toda la altura de la pantalla
        width: "100vw", // Hace que el contenedor ocupe toda la anchura de la pantalla
    },
};

export default Preloader;

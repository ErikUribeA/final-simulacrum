'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormField } from "@/UI/molecules";
import { FormSelectField } from "@/UI/molecules/FormSelect";
import { Button } from "@mui/joy";
import { CloudUploadIcon } from "lucide-react";
import {
    ErrorResponse,
    FieldError,
    IPostCLient,
} from "@/app/core/application/dto";

const RegisterSchema = yup.object().shape({
    email: yup
        .string()
        .email("El correo es inválido")
        .required("El correo es obligatorio"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
    name: yup.string().required("El nombre es obligatorio"),
    role: yup.string().required("El rol es obligatorio"),
    photo: yup
        .mixed<File>()
        .required("La foto es obligatoria"),
});

export const RegisterForm = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<IPostCLient>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(RegisterSchema),
    });

    const router = useRouter();

    const handleRegister = async (data: IPostCLient) => {
        try {
            // Imprimir los datos del formulario en la consola
            console.log("Datos del formulario:", data);
    
            const formData = new FormData();
    
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("name", data.name);
            formData.append("role", data.role);
    
            if (data.photo) {
                formData.append("photo", data.photo);
            }
    
            const response = await fetch("/api/register", {
                method: "POST",
                body: formData
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error en la respuesta de la API:", errorData);
                throw new Error("Error al registrar el usuario");
            }
            alert('Usuario registrado exitosamente');
            router.push("/login");
            return await response.json();
    
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            throw error; 
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(Array.from(event.target.files));
        }
    };

    return (
        <form
            className="w-full max-w-sm mx-auto p-4 space-y-4"
            onSubmit={handleSubmit(handleRegister)}
        >
            <FormField<IPostCLient>
                control={control}
                type="email"
                label="Correo Electrónico"
                name="email"
                error={errors.email}
                placeholder="Ingresa tu correo"
            />

            <FormField<IPostCLient>
                control={control}
                type="password"
                label="Contraseña"
                name="password"
                error={errors.password}
                placeholder="Ingresa tu contraseña"
            />

            <FormField<IPostCLient>
                control={control}
                type="text"
                label="Nombre"
                name="name"
                error={errors.name}
                placeholder="Ingresa tu nombre"
            />

            <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium">
                    Rol
                </label>
                <select
                    {...control.register("role")}
                    className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                >
                    <option value="volunteer">Volunteer</option>
                    <option value="organizer">Organizer</option>
                </select>
                {errors.role && (
                    <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Button
                    component="label"
                    variant="soft"
                    startDecorator={<CloudUploadIcon />}
                    fullWidth
                >
                    Subir Foto
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                    />
                </Button>
                <ul className="text-sm text-gray-600">
                    {selectedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-black rounded-md text-white font-medium"
            >
                Registrarse
            </button>
        </form>
    );
};

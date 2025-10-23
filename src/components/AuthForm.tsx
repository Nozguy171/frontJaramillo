"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { loginRequest, signupRequest } from "@/lib/api";
import { saveAuth } from "@/lib/authStorage";
import { useRouter } from "next/navigation";

const schema = z.object({
  correo: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  remember: z.boolean().default(false),
});

type FormValues = z.infer<typeof schema>;

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: { correo: "", password: "", remember: false },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (mode === "signup") {
        await signupRequest(values.correo, values.password);
        toast.success("Cuenta creada. Inicia sesión ahora.");
        router.push("/login");
        return;
      }
      const res = await loginRequest(values.correo, values.password);
      saveAuth(res.access_token, res.usuario.correo, values.remember);
      toast.success(`Bienvenido ${res.usuario.correo}`);
      router.push("/segment");
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Ocurrió un error";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const remember = watch("remember") ?? false;

  return (
    <div className="w-full flex items-center justify-center py-16">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">
            {mode === "signup" ? "Crear cuenta" : "Iniciar sesión"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="correo">Correo</Label>
              <Input id="correo" type="email" placeholder="tu@correo.com" {...register("correo")} />
              {errors.correo && <p className="text-sm text-red-600">{errors.correo.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(v) => setValue("remember", v === true)}
              />
              <Label htmlFor="remember">Recuérdame</Label>
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Procesando..." : (mode === "signup" ? "Crear cuenta" : "Entrar")}
            </Button>
          </form>

          <p className="text-sm text-gray-600">
            {mode === "signup"
              ? <>¿Ya tienes cuenta? <a className="text-blue-600 underline" href="/login">Inicia sesión</a></>
              : <>¿No tienes cuenta? <a className="text-blue-600 underline" href="/signup">Regístrate</a></>}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

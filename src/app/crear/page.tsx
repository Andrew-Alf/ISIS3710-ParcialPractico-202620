"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/services/session";

export default function CrearPlan() {
  const router = useRouter();

  // Estados de los campos del formulario
  const [fotoPortada, setFotoPortada] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [precioEstimado, setPrecioEstimado] = useState("");
  const [duracion, setDuracion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");

  // Estados de interfaz
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Validar nombre
    const nombreLimpio = nombre.trim();

    if (nombreLimpio.length < 2 || nombreLimpio.length > 50) {
      setError("El nombre debe tener entre 2 y 50 caracteres.");
      return;
    }

    // Convertir valores numéricos
    const precio = Number(precioEstimado);
    const tiempo = Number(duracion);

    // Validar precio
    if (Number.isNaN(precio) || precio <= 0) {
      setError("El precio estimado debe ser mayor a 0.");
      return;
    }

    // Validar duración
    if (
      Number.isNaN(tiempo) ||
      !Number.isInteger(tiempo) ||
      tiempo <= 0
    ) {
      setError("La duración debe ser un número entero mayor a 0.");
      return;
    }

    // Validar descripción
    if (descripcion.length >= 600) {
      setError("La descripción debe tener menos de 600 caracteres.");
      return;
    }

    // Obtener usuario autenticado
    const session = getSession();

    if (!session.id) {
      setError("Debes iniciar sesión para crear un plan.");
      return;
    }

    // Body que espera el backend
    const newPlan = {
      name: nombreLimpio,
      description: descripcion,
      estimatedPrice: precio,
      estimatedTime: tiempo,
      recomendations: recomendaciones,
      address: direccion,
      image: fotoPortada,
      userId: session.id,
    };

    try {
      setCargando(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plans`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlan),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        setError(
          data?.message || "No se pudo crear el plan. Intenta nuevamente."
        );

        return;
      }

      router.push("/plans");
    } catch (error) {
      console.error("Error al crear el plan:", error);
      setError("Ocurrió un error al comunicarse con el servidor.");
    } finally {
      setCargando(false);
    }
  }

  function handleCancelar() {
    router.push("/plans");
  }

  return (
    <div className="flex-1 bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Encabezado */}
        <h1 className="text-4xl font-bold text-slate-900">
          Crear un nuevo plan
        </h1>

        <p className="mt-2 text-slate-600">
          Organiza, invita a tus amigos o abre plazas para que otros miembros
          se sumen a vivir momentos únicos.
        </p>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white p-8 shadow"
        >
          {/* Foto de portada */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="fotoPortada"
                className="font-semibold text-slate-800"
              >
                Foto de portada del plan
              </label>

              <span className="text-sm text-slate-500">
                Copia el enlace de una imagen
              </span>
            </div>

            <div className="mt-3 rounded-xl border-2 border-dashed border-slate-200 p-6">
              <div className="text-center text-slate-500">

                <p className="mt-2 text-sm">
                  Haz que tu plan destaque a primera vista
                </p>
              </div>

              <input
                id="fotoPortada"
                type="url"
                name="fotoPortada"
                placeholder="https://..."
                value={fotoPortada}
                onChange={(e) => setFotoPortada(e.target.value)}
                required
                className="mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Nombre */}
          <div className="mt-6">
            <label
              htmlFor="nombre"
              className="font-semibold text-slate-800"
            >
              Nombre del plan *
            </label>

            <input
              id="nombre"
              type="text"
              name="nombre"
              placeholder="Ej. Tarde de paddle surf y atardecer"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              minLength={2}
              maxLength={50}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 outline-none focus:border-blue-500"
            />
          </div>

          {/* Dirección */}
          <div className="mt-6">
            <label
              htmlFor="direccion"
              className="font-semibold text-slate-800"
            >
              Dirección *
            </label>

            <input
              id="direccion"
              type="text"
              name="direccion"
              placeholder="Ej. Bahía de las Brisas - Muelle Norte"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 outline-none focus:border-blue-500"
            />
          </div>

          {/* Precio y duración */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="precioEstimado"
                className="font-semibold text-slate-800"
              >
                Precio estimado *
              </label>

              <input
                id="precioEstimado"
                type="number"
                name="precioEstimado"
                placeholder="Ej. 25000"
                value={precioEstimado}
                onChange={(e) => setPrecioEstimado(e.target.value)}
                min={1}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="duracion"
                className="font-semibold text-slate-800"
              >
                Duración (minutos) *
              </label>

              <input
                id="duracion"
                type="number"
                name="duracion"
                placeholder="Ej. 120"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                min={1}
                step={1}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="mt-6">
            <div className="flex justify-between">
              <label
                htmlFor="descripcion"
                className="font-semibold text-slate-800"
              >
                Descripción del plan *
              </label>

              <span className="text-sm text-slate-500">
                {descripcion.length} / 599
              </span>
            </div>

            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Cuéntale a todos de qué va el plan, cuál es la vibra del grupo, el itinerario aproximado y qué lo hace especial..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              maxLength={599}
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 outline-none focus:border-blue-500"
            />
          </div>

          {/* Recomendaciones */}
          <div className="mt-6">
            <label
              htmlFor="recomendaciones"
              className="font-semibold text-slate-800"
            >
              Recomendaciones para los asistentes
            </label>

            <p className="mt-1 text-sm text-slate-500">
              Agrega tips clave como vestimenta recomendada, qué llevar o
              recordatorios puntuales.
            </p>

            <textarea
              id="recomendaciones"
              name="recomendaciones"
              placeholder="Ej. Llevar protector solar, toalla y agua"
              value={recomendaciones}
              onChange={(e) => setRecomendaciones(e.target.value)}
              rows={3}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 outline-none focus:border-blue-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Botones */}
          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={handleCancelar}
              disabled={cargando}
              className="rounded-xl bg-slate-200 px-6 py-3 font-semibold text-slate-700 disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={cargando}
              className="rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cargando ? "Publicando..." : "Publicar plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React from "react";
import Card from "../components/ui/Card";

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-4">
      <Card>
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Proyecto Web Full Stack
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Este es un proyecto académico desarrollado utilizando las tecnologías{" "}
            <strong className="text-blue-600">PostgreSQL, Express, React y Node.js</strong>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Forma parte del trabajo práctico integrador de la{" "}
            <strong>Tecnicatura Universitaria en Programación</strong> de la{" "}
            <strong>Universidad Tecnológica Nacional (UTN) - Facultad Regional San Rafael</strong>.
          </p>
          <p className="text-gray-500 text-sm">
            Nuestro objetivo es aplicar los conocimientos adquiridos en
            desarrollo web, bases de datos y arquitectura cliente-servidor.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default HomePage;

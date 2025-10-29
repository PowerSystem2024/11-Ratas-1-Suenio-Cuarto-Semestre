import React from "react";
import Card from "../components/ui/Card";

function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-4">
      <Card>
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Acerca del Proyecto</h1>
          <p className="text-gray-600 text-lg mt-2">🚧 Próximamente 🚧</p>
          <p className="text-gray-500">
            Estamos trabajando en esta sección para ofrecer más información
            sobre el equipo, los objetivos y el desarrollo del proyecto.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default AboutPage;

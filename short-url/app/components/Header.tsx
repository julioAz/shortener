"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

const Header = () => {
  const [url, setUrl] = useState<string>("");

  const shortUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(url)
    try {
      const response = await axios.post("http://localhost:10000/shorten", {
        fullUrl: url, // Envia a URL capturada
      });
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro ao encurtar a URL:", error);
    }
  };

  return (
    <div className="container mx-auto my-auto px-4">
      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        URL
      </h2>
      <form onSubmit={shortUrl}>
        <Input
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)} // Atualiza o estado com o valor do campo
          placeholder="Insira a URL aqui"
        />
        <Button type="submit" className="mt-2" variant="outline">
          Encurtar
        </Button>
      </form>
    </div>
  );
};

export default Header;

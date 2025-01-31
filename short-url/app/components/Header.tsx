"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

const Header = () => {
  const [url, setUrl] = useState<string>("");
  const [shortedUrl, setShortedUrl] = useState<string>("");

  const shortUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(url);
    try {
      const response = await axios.post("http://localhost:10000/shorten", {
        fullUrl: url, // Envia a URL capturada
      });
      setShortedUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Erro ao encurtar a URL:", error);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortedUrl);
    } catch (error) {
      console.error("Erro ao copiar o link: ", error);
    }
  };

  return (
    <div className="container mx-auto my-auto px-4">
      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Encurtador de URL
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
      {shortedUrl && (
        <>
          <p className="mt-4">
            URL encurtada:{" "}
            <a href={shortedUrl} target="_blank">
              {shortedUrl}
            </a>
          </p>
          <Button 
            onClick={copyToClipboard} 
            className="mt-2" 
            variant="outline"
          >
            Copiar Link
          </Button>
        </>
      )}
    </div>
  );
};

export default Header;

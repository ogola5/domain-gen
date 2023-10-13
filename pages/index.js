import Head from "next/head";
import { Inter } from "next/font/google";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton";
import ResponseDisplay from "@/components/ResponseDisplay";
import useApi from "@/hooks/useApi";
import { getUserPrompt } from "../prompts/promptUtils";
import DropdownSelect from "@/components/DropdownSelect";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, error, loading, fetchData } = useApi();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInput = {
      business: selectedBusiness,
      location: selectedLocation,
      sector: selectedSector,
    };

    const submitValue = getUserPrompt(userInput);
    await fetchData("/api/openai", "POST", submitValue);
  };

  return (
    <>
      <Head>
        <title>Domain Name Generator</title>
        <meta name="description" content="Generate unique domain names for your business" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1 className={inter.className}>Domain Name Generator</h1>
        <p className={inter.className}>
          Test this domain name generator: Select options to generate a domain name.
        </p>
        <form>
          <ResponseDisplay data={data} error={error} loading={loading} />
          <DropdownSelect
            label="Location"
            options={["Kenya", "USA", "UK", "India", "Other", "Australia", "Canada", "Germany", "Brazil", "South Africa", "Nigeria", "France", "Japan", "China", "Singapore", "Mexico", "Spain", "Italy", "Switzerland", "Greece", "Sweden"]}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          />
          <DropdownSelect
            label="Business"
            options={["Blockchain Fintech", "E-commerce", "Healthcare", "Other", "Automotive", "Education", "Food & Beverage", "Travel", "Entertainment", "Real Estate", "Technology", "Fashion", "Finance", "Manufacturing", "Retail", "Telecommunications", "Energy", "Media", "Agriculture", "Hospitality", "Aviation"]}
            value={selectedBusiness}
            onChange={(e) => setSelectedBusiness(e.target.value)}
          />
          <DropdownSelect
            label="Sector"
            options={["Local Market", "Global Expansion", "Startup", "Small Business", "Non-Profit", "Government", "Education", "Healthcare", "Finance", "Media", "Technology", "Entertainment", "Food & Beverage", "Retail", "Real Estate", "Transportation", "Energy", "Agriculture", "Hospitality", "Travel & Tourism", "Sports"]}
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          />
          <SubmitButton onClick={handleSubmit} disabled={loading} />
        </form>
      </main>
    </>
  );
}


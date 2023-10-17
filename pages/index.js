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
  const [selectedOptions, setSelectedOptions] = useState({
    location: "",
    business: "",
    sector: "",
  });
  const [customOptions, setCustomOptions] = useState({
    customLocation: "",
    customBusiness: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInput = {
      business:
        selectedOptions.business === "Other"
          ? selectedOptions.customBusiness
          : selectedOptions.business,
      location:
        selectedOptions.location === "Other"
          ? selectedOptions.customLocation
          : selectedOptions.location,
      sector: selectedOptions.sector,
    };
    if (!userInput.business || !userInput.location) {
      alert("Empty input not allowed");
      setSelectedOptions({
        location: "",
        business: "",
        sector: "",
      });
      setCustomOptions({ customLocation: "", customBusiness: "" });
      return;
    }
    if (!userInput.business.trim() || !userInput.location.trim()) {
      alert("Enter valid input");
      setSelectedOptions({
        location: "",
        business: "",
        sector: "",
      });
      setCustomOptions({ customLocation: "", customBusiness: "" });
      return;
    }
    const submitValue = getUserPrompt(userInput);
    await fetchData("/api/openai", "POST", submitValue);
    setSelectedOptions({
      location: "",
      business: "",
      sector: "",
    });
    setCustomOptions({ customLocation: "", customBusiness: "" });
  };
  const handleOptions = (event, name) => {
    event.preventDefault();
    const { value } = event.target;
    setSelectedOptions((prevoptions) => ({ ...prevoptions, [name]: value }));
  };
  const handleOpt = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setCustomOptions((prev) => ({ ...prev, [name]: value }));
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Head>
        <title>Domain Name Generator</title>
        <meta
          name="description"
          content="Generate unique domain names for your business"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1 className={inter.className}>Domain Name Generator</h1>
        <p className={inter.className}>
          Test this domain name generator: Select options to generate a domain
          name.
        </p>
        <form>
          <ResponseDisplay data={data} error={error} loading={loading} />
          <div className="options">
            <DropdownSelect
              label="Location"
              options={[
                "Kenya",
                "USA",
                "UK",
                "India",
                "Other",
                "Australia",
                "Canada",
                "Germany",
                "Brazil",
                "South Africa",
                "Nigeria",
                "France",
                "Japan",
                "China",
                "Singapore",
                "Mexico",
                "Spain",
                "Italy",
                "Switzerland",
                "Greece",
                "Sweden",
              ]}
              value={selectedOptions.location}
              onChange={(e) => handleOptions(e, "location")}
            />
            {selectedOptions.location === "Other" && (
              <input
                placeholder="Enter your location"
                name="customLocation"
                onChange={handleOpt}
                value={customOptions.customLocation}
              />
            )}
            <DropdownSelect
              label="Business"
              options={[
                "Blockchain Fintech",
                "E-commerce",
                "Healthcare",
                "Other",
                "Automotive",
                "Education",
                "Food & Beverage",
                "Travel",
                "Entertainment",
                "Real Estate",
                "Technology",
                "Fashion",
                "Finance",
                "Manufacturing",
                "Retail",
                "Telecommunications",
                "Energy",
                "Media",
                "Agriculture",
                "Hospitality",
                "Aviation",
              ]}
              value={selectedOptions.business}
              onChange={(e) => handleOptions(e, "business")}
            />
            {selectedOptions.business === "Other" && (
              <input
                placeholder="Enter your Business"
                name="customBusiness"
                onChange={handleOpt}
                value={customOptions.customBusiness}
              />
            )}
            <DropdownSelect
              label="Sector"
              options={[
                "Local Market",
                "Global Expansion",
                "Startup",
                "Small Business",
                "Non-Profit",
                "Government",
                "Education",
                "Healthcare",
                "Finance",
                "Media",
                "Technology",
                "Entertainment",
                "Food & Beverage",
                "Retail",
                "Real Estate",
                "Transportation",
                "Energy",
                "Agriculture",
                "Hospitality",
                "Travel & Tourism",
                "Sports",
              ]}
              value={selectedOptions.sector}
              onChange={(e) => handleOptions(e, "sector")}
            />
          </div>

          <SubmitButton onClick={handleSubmit} disabled={loading} />
        </form>
      </main>
    </>
  );
}


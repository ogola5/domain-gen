// File: /prompts/promptUtils.js

export function getSystemPrompt() {
  return {
    role: "system",
    content: "You are a helpful assistant that specializes in generating domain names for businesses.",
  };
}

export function getUserPrompt(input) {
  return {
    role: "user",
    content: `Generate a domain name, step-by-step, for a ${input.business} in ${input.location} within the ${input.sector} sector. Include possible monetization options.`,
  };
}

export function getFunctions() {
  return [
    {
      name: "generate_domain_name",
      description: "Generate a domain name for a business.",
      parameters: {
        type: "object",
        properties: {
          domainName: {
            type: "string",
            description: "The generated domain name for the business.",
          },
          instructions: {
            type: "array",
            items: {
              type: "string",
            },
            description: "An array of strings representing the step-by-step process for domain name generation.",
          },
          monetization: {
            type: "string",
            description: "Possible monetization options for the domain name.",
          },
        },
        required: ["domainName", "instructions", "monetization"],
      },
    },
  ];
}

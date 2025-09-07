import transformers
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
import torch

# Load LLM model
model_name = "tiiuae/falcon-7b-instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=True)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16, device_map="auto")

generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

# Prescriptive Intelligence
modules_knowledge = {
    "Data Hub": "Gather and collect raw data from various sources (ERP, SCM, production systems) for real-time use.",
    "DataAlign": "Standardize, clean, and normalize data for better model compatibility.",
    "LogicBox": "Run AI/ML models, real-time analytics, and derive actionable insights from processed data.",
    "Cortex AI": "Generate intelligent suggestions and prescriptive analytics based on operational data.",
    "Opteris": "Simulate processes virtually, optimize workflows, and test different scenarios safely.",
    "InsightX": "Provide predictive analysis and deep insights into operational performance.",
    "EcoIntel": "Analyze and suggest eco-friendly, energy-efficient practices tailored to SME operations.",
    "Reflex AI": "Monitor system and web performance continuously, suggesting improvements dynamically."
}

# Function to analyze user input and infer target improvement area
def infer_target_area(user_input):
    user_input_lower = user_input.lower()
    if "data" in user_input_lower:
        if "clean" in user_input_lower or "format" in user_input_lower:
            return "DataAlign"
        else:
            return "Data Hub"
    elif "workflow" in user_input_lower or "optimization" in user_input_lower:
        return "Opteris"
    elif "prediction" in user_input_lower or "future" in user_input_lower:
        return "InsightX"
    elif "energy" in user_input_lower or "eco" in user_input_lower:
        return "EcoIntel"
    elif "ai" in user_input_lower or "intelligence" in user_input_lower:
        return "Cortex AI"
    elif "monitor" in user_input_lower or "performance" in user_input_lower:
        return "Reflex AI"
    else:
        return "LogicBox"  

# Conversational agnet
def chatbot_response(user_prompt):
    target_module = infer_target_area(user_prompt)
    context = f"You are an expert in SME product workflows improvement using Stratix platform. Focus on {target_module} module. Here are details: {modules_knowledge[target_module]}. Based on the user's prompt: '{user_prompt}', suggest actionable and prescriptive improvements. Think step-by-step, reason deeply, and infer opportunities for optimization."
    
    response = generator(context, max_length=300, temperature=0.7, top_p=0.9, do_sample=True)[0]["generated_text"]
    return response.replace(context, "").strip()

if __name__ == "__main__":
    print("🤖 Stratix SME Prescriptive AI Chatbot")
    print("Type 'exit' to quit.\n")
    while True:
        user_input = input("User: ")
        if user_input.lower() == "exit":
            break
        bot_output = chatbot_response(user_input)
        print(f"StratixBot: {bot_output}\n")
import express from "express";

const databaseUrl = process.env.DATABASE_URL || (typeof gotendv !== "undefined" ? gotendv.Get("DATABASE_URL") : undefined);
console.log("DATABASE_URL:", databaseUrl || "not set");

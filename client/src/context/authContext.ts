import React from "react";
import { createContext, useState } from "react";

export interface TokenContext {
	jwtToken: string,
	setJwtToken: React.Dispatch<React.SetStateAction<string>>,
}

export const AuthToken = React.createContext({} as TokenContext);

export const User = createContext(null)
import { createContext, Dispatch, ReactNode, useContext, useState } from "react";
export type PortfolioContextType = {
	isEditMode: boolean;
	setIsEditMode: Dispatch<React.SetStateAction<boolean>>;
};
const PortfolioContext = createContext<PortfolioContextType | {}>({});
export const PortfolioContextProvider = ({ children, value }: { children: ReactNode; value: PortfolioContextType }) => {
	const [isEditMode, setIsEditMode] = useState(false);
	return <PortfolioContext.Provider value={{ isEditMode, setIsEditMode }}>{children}</PortfolioContext.Provider>;
};
export const usePortfolioContext = () => useContext(PortfolioContext);

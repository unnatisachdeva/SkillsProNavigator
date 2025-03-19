import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header"; 
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkillsPro Navigator",
  description: "Your personalized career and skill-building companion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              baseTheme: "dark",  // ✅ Explicitly setting dark mode
              layout: {
                socialButtonsVariant: "iconButton",
                showOptionalFields: false,
              },
              elements: {
                card: "bg-gray-900 text-white shadow-lg border border-gray-700",  // ✅ Dark mode styling
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                formFieldInput: "bg-gray-800 text-white border border-gray-600",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                formFieldLabel: "text-gray-300",
              },
            }}
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200"></div>
            </footer>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

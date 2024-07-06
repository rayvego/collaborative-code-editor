import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LANGUAGE_VERSIONS } from "@/lib/constants";

interface LanguageSelectorProps {
  language: string;
  onSelect: (lang: string) => void;
}

export const LanguageSelector = ({ language, onSelect }: LanguageSelectorProps) => {
  return (
    <div className="mb-2 ml-2">
      <label htmlFor="language" className="block text-lg mb-1">
        Language:
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between" id="language">
            {language}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 bg-gray-900 text-white">
          {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
            <div
              key={lang}
              onClick={() => onSelect(lang)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-800 ${
                lang === language ? "bg-gray-800 text-red-400" : ""
              }`}
            >
              {lang} <span className="text-gray-600 text-sm">({version})</span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
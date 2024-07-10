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
          <Button variant="outline" className="justify-between" id="language">
            {language}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="">
          {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
            <div
              key={lang}
              onClick={() => onSelect(lang)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-xl transition-colors ${lang === language ? "bg-gray-200" : ""}`}
            >
              {lang} <span className="text-muted-foreground text-sm">({version})</span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
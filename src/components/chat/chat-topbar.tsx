"use client";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import * as webllm from "@mlc-ai/web-llm";
import { Button } from "../ui/button";
import { CaretSortIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sidebar } from "../sidebar";
import { Message } from "ai/react";
import useChatStore from "@/hooks/useChatStore";
import { Models, Model } from "@/lib/models";
import { Badge } from "../ui/badge";
import { Image } from "lucide-react";

interface ChatTopbarProps {
  chatId?: string;
  stop: () => void;
}

export default function ChatTopbar({ chatId, stop }: ChatTopbarProps) {
  const [open, setOpen] = React.useState(false);

  // Zustand store
  const selectedModel = useChatStore((state) => state.selectedModel);
  const setSelectedModel = useChatStore((state) => state.setSelectedModel);
  const isLoading = useChatStore((state) => state.isLoading);

  return (
    <div className="w-full flex px-4 py-6  items-center justify-between lg:justify-center ">
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon className="md:hidden w-5 h-5" />
        </SheetTrigger>
        <SheetContent side="left">
          <Sidebar chatId={chatId || ""} isCollapsed={false} stop={stop} />
        </SheetContent>
      </Sheet>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={isLoading}
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-[180px] md:w-[300px] justify-between bg-accent dark:bg-card"
          >
            <div className="flex gap-2 items-center truncate">
              <p className="truncate">{selectedModel.displayName}</p>
              {selectedModel.badge && <Badge>{selectedModel.badge}</Badge>}
              {selectedModel.vision && <Badge>Vision</Badge>}
            </div>
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] md:w-[300px] max-h-96 overflow-y-scroll p-1">
          {Models.map((model) => (
            <Button
              key={model.name}
              variant="ghost"
              className="w-full justify-start flex gap-2 items-center truncate"
              onClick={() => {
                setSelectedModel(model);
                setOpen(false);
              }}
            >
              {model.displayName}
              {model.badge && <Badge>{model.badge}</Badge>}
              {model.vision && <Badge>Vision</Badge>}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
      <div></div>
    </div>
  );
}

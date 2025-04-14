'use client'

import {
  BookOpen,
  CheckCircle,
  MessageSquare,
  Mic,
  Send,
  Star,
  Zap
} from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { capitalizeFirstLetter, formatMultilingualContent, getInitials } from '@/lib/utils'

const Chat = ({ user }: any) => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [loading, setLoading] = useState(false)


  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMessage],
      }),
    })

    if (!res.body) return

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let botMessage = ""

    setMessages(prev => [...prev, { role: "assistant", content: "" }])

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value)
      botMessage += chunk
      setMessages(prev =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, content: botMessage } : msg
        )
      )
    }

    setLoading(false)
  }

  return (
    <div className="w-full md:w-3/4">
      <Tabs defaultValue="conversation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-neutral-800">
          <TabsTrigger
            value="conversation"
            className="text-neutral-500 data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Conversation
          </TabsTrigger>
          <TabsTrigger
            value="lessons"
            className="text-neutral-500 data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <BookOpen className="mr-2 h-4 w-4" /> Lessons
          </TabsTrigger>
        </TabsList>

        {/* --- CONVERSATION TAB --- */}
        <TabsContent value="conversation" className="mt-0 game-section">
          <div className="border border-neutral-800 rounded-lg overflow-hidden bg-black">
            <div className="bg-neutral-800 p-4 border-b border-neutral-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {capitalizeFirstLetter(user.targetLanguage)} Conversation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Practice with Kizzi, your AI tutor
                  </p>
                </div>
                {/* <div className="ml-auto flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-game-primary border-green-500"
                  >
                    <Zap className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-[10px] text-green-500">2X XP</span>
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:text-white border-neutral-800 bg-black hover:bg-neutral-800"
                  >
                    Change Topic
                  </Button>
                </div> */}
              </div>
            </div>

            {/* --- CHAT WINDOW --- */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && !loading && (
              <div className=" flex justify-center items-center text-center text-neutral-500 text-xl mt-10">
                Start chatting<br/> to see messages here ✨
              </div>
            )}
              {messages.map((msg, i) =>
                msg.role === "assistant" ? (
                  <div key={i} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center mr-3 flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="rounded-lg max-w-[80%] space-y-2">
                      {formatMultilingualContent(msg.content).map((pair, index) => (
                        <div
                          key={index}
                          className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-3"
                        >
                          <div className="text-xs uppercase text-neutral-400 tracking-widest">
                            {user.targetLanguage || "English"}
                          </div>
                          <div className="text-white text-base font-semibold whitespace-pre-line">
                            {pair.foreign}
                          </div>
                          {pair.native && (
                            <>
                              <div className="text-xs uppercase text-neutral-400 tracking-widest">
                                Translation
                              </div>
                              <div className="text-neutral-500 text-sm italic whitespace-pre-line">
                                {pair.native}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex items-start justify-end">
                    <div className="bg-green-800 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center ml-3 flex-shrink-0">
                      <span className="text-sm font-medium">{getInitials(user.fullName)}</span>
                    </div>
                  </div>
                )
              )}
              {loading && (
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center mr-3 flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-green-500 animate-pulse" />
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm italic text-muted-foreground">Kizzi is typing...</p>
                  </div>
                </div>
              )}
            </div>

            {/* --- INPUT --- */}
            <div className="p-4 border-t border-neutral-800">
              <div className="flex items-center">
                {/* <Button
                  variant="outline"
                  className="rounded-full h-10 w-10 p-0 mr-2 border-neutral-800 bg-neutral-800 hover:bg-neutral-900"
                >
                  <Mic className="h-5 w-5 text-green-500" />
                </Button> */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your response..."
                    className="w-full rounded-full border border-neutral-800 py-2 px-4 pr-10 bg-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Button
                    type="button"
                    onClick={sendMessage}
                    className="absolute right-1 top-1 rounded-full h-8 w-8 p-0 bg-gradient-to-r from-cyan-500 to-green-500 cursor-pointer hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* --- LESSONS TAB --- */}
        <TabsContent value="lessons" className="mt-0 game-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* This part was cut off in your input */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Chat

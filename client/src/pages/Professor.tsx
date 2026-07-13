import React, { useState, useRef, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Send, MessageCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';

type RegisterLevel = 'volgare' | 'colloquiale' | 'neutro' | 'formale' | 'letterario';

const Professor: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [registerLevel, setRegisterLevel] = useState<RegisterLevel>('neutro');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Chat mutation
  const chatMutation = trpc.professor.chat.useMutation();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatMutation.mutateAsync({
        message: userMessage,
        registerLevel,
        topic: topic || undefined,
        conversationContext: messages,
      });

      setMessages((prev) => [...prev, { role: 'assistant', content: response.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="rtl min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="h-8 w-8" />
            <h1 className="font-arabic-title text-4xl font-bold">الأستاذ رؤوف</h1>
          </div>
          <p className="font-arabic-body text-lg opacity-90">
            دردشة غير محدودة مع معلمك الإيطالي الخاص - بدون حد للأسئلة أو الوقت
          </p>
        </div>
      </section>

      {/* Chat Container */}
      <section className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col h-[600px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/50">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                  <h2 className="font-arabic-title text-2xl font-bold text-foreground mb-2">
                    مرحباً! أنا الأستاذ رؤوف
                  </h2>
                  <p className="font-arabic-body text-muted-foreground max-w-md">
                    أنا هنا لمساعدتك في تعلم اللغة الإيطالية. اسأل عن أي شيء - القواعس، المفردات، الثقافة، أو أي موضوع آخر. لا حد للأسئلة!
                  </p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted text-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="font-arabic-body text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="font-arabic-body text-sm">جاري الكتابة...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4 bg-card space-y-4">
              {/* Controls */}
              <div className="grid grid-cols-2 gap-3">
                <Select value={registerLevel} onValueChange={(value) => setRegisterLevel(value as RegisterLevel)}>
                  <SelectTrigger className="font-arabic-body">
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="volgare">عامية (Volgare)</SelectItem>
                    <SelectItem value="colloquiale">غير رسمية (Colloquiale)</SelectItem>
                    <SelectItem value="neutro">محايدة (Neutro)</SelectItem>
                    <SelectItem value="formale">رسمية (Formale)</SelectItem>
                    <SelectItem value="letterario">أدبية (Letterario)</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="الموضوع (اختياري)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="font-arabic-body"
                />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="اكتب سؤالك هنا..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="font-arabic-body"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Info Box */}
          <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
            <p className="font-arabic-body text-sm text-blue-900">
              💡 <strong>نصيحة:</strong> اختر مستوى اللغة المناسب لك. يمكنك تغييره في أي وقت للتعلم بمستويات مختلفة من الرسمية.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Professor;

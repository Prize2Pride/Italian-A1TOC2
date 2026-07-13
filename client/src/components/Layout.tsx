import React from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Home as HomeIcon, Book, GraduationCap, Settings, UserCircle2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'الرئيسية', icon: HomeIcon, href: '/' },
  { name: 'الدورات', icon: Book, href: '/courses' },
  { name: 'تقدمي', icon: GraduationCap, href: '/progress' },
  { name: 'الإعدادات', icon: Settings, href: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className="fixed right-0 top-0 z-50 h-full w-20 flex-col overflow-hidden border-l bg-sidebar p-2 shadow-lg rtl">
      <div className="flex h-16 items-center justify-center">
        <Link href="/">
          <img src="/manus-storage/logo-icon_7f8eaada.png" alt="Italina Logo" className="h-10 w-10" />
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 p-2">
          {navItems.map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:h-8 md:w-8"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.name}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left" className="rtl">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:h-8 md:w-8"
              >
                <UserCircle2 className="h-5 w-5" />
                <span className="sr-only">الملف الشخصي</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="rtl">
              الملف الشخصي
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background rtl">
      <Sidebar />
      <main className="flex-1 pr-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;

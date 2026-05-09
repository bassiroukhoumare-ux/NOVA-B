import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminLegal = () => {
  const [legalPages, setLegalPages] = useState({ mentions: '', confidentialite: '', conditions: '' });
  const { toast } = useToast();

  useEffect(() => {
    setLegalPages(db.getLegal());
  }, []);

  const handleSave = () => {
    db.saveLegal(legalPages);
    toast({ title: "Pages légales mises à jour" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-white">Pages Légales</h1>
        <button onClick={handleSave} className="bg-terracotta text-white px-6 py-2 rounded-xl font-bold">
          Enregistrer Tout
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
        <Tabs defaultValue="mentions">
          <TabsList className="bg-black/20 text-white mb-6">
            <TabsTrigger value="mentions">Mentions Légales</TabsTrigger>
            <TabsTrigger value="confidentialite">Confidentialité</TabsTrigger>
            <TabsTrigger value="conditions">CGU</TabsTrigger>
          </TabsList>

          {['mentions', 'confidentialite', 'conditions'].map((key) => (
            <TabsContent key={key} value={key}>
              <div className="bg-white text-black rounded-lg overflow-hidden min-h-[400px]">
                <ReactQuill 
                  theme="snow" 
                  value={legalPages[key]} 
                  onChange={(val) => setLegalPages({...legalPages, [key]: val})}
                  className="h-[350px]"
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminLegal;
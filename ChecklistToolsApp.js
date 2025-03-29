import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SignaturePad from "react-signature-canvas";

export default function ChecklistTools() {
  const [formData, setFormData] = useState({});
  const [signature, setSignature] = useState(null);
  let sigPad = {};

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("Service Worker Registered");
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const clearSignature = () => {
    sigPad.clear();
    setSignature(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignature(sigPad.getTrimmedCanvas().toDataURL("image/png"));
    console.log("Data submitted:", formData, "Signature:", signature);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checklist Tools Mekanik</h1>
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <Input name="no" placeholder="No" onChange={handleChange} />
              <Input name="pn" placeholder="PN" onChange={handleChange} />
              <Input name="description" placeholder="Description" onChange={handleChange} />
              <Input name="toolName" placeholder="Nama Alat" onChange={handleChange} />
              <Input name="condition" placeholder="Kondisi" onChange={handleChange} />
              <div className="flex items-center gap-2">
                <Checkbox name="checked" onChange={handleCheckboxChange} />
                <label>Checklist</label>
              </div>
              <div>
                <p className="mb-2">Tanda Tangan:</p>
                <SignaturePad ref={(ref) => (sigPad = ref)} canvasProps={{ className: "border w-full h-24" }} />
                <Button onClick={clearSignature} className="mt-2">Hapus TTD</Button>
              </div>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

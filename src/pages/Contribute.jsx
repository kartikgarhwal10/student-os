import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { supabase } from "../lib/supabaseClient";

function Contribute() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [resourceType, setResourceType] = useState("Notes");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!title || !subject) {
      alert("Please fill title and subject");
      return;
    }

    setMessage("Uploading resource...");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) {
      alert("Please login first");
      return;
    }

    let fileUrl = externalLink;

    if (file) {
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "-");
const fileName = `${userData.user.id}/${Date.now()}-${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("resources")
        .upload(fileName, file);

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("resources")
        .getPublicUrl(fileName);

      fileUrl = data.publicUrl;
    }

    const { error } = await supabase.from("resources").insert({
      user_id: userData.user.id,
      title,
      subject,
      type: resourceType,
      description,
      file_url: fileUrl,
      status: "Pending",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Resource submitted for review successfully!");

    setTitle("");
    setSubject("");
    setResourceType("Notes");
    setDescription("");
    setExternalLink("");
    setFile(null);
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Contribute Resource
        </h1>
        <p className="mt-2 text-slate-600">
          Share notes, PDFs, PYQs, viva questions, assignments, or useful links.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">
            Resource Details
          </h2>

          <div className="mt-5 space-y-4">
            <input
              type="text"
              placeholder="Resource Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="text"
              placeholder="Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            >
              <option>Notes</option>
              <option>PYQ</option>
              <option>Assignment</option>
              <option>Viva Questions</option>
              <option>Useful Link</option>
              <option>Placement Resource</option>
            </select>

            <textarea
              placeholder="Short description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="url"
              placeholder="External Link optional"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white"
            >
              Submit for Review
            </button>

            {message && <p className="text-sm text-blue-600">{message}</p>}
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <h2 className="text-xl font-bold">How it works?</h2>

          <div className="mt-5 space-y-4 text-slate-300">
            <p>1. Student uploads resource.</p>
            <p>2. Resource goes into pending review.</p>
            <p>3. Admin verifies quality.</p>
            <p>4. Approved resource becomes public.</p>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Selected Type</p>
            <h3 className="mt-1 text-2xl font-bold">{resourceType}</h3>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Contribute;
import { useState } from 'react';
import { fetchMoleculeData, type InputType, type MoleculeMetadata } from './api';
import { MoleculeViewer, type VisualizationStyle } from './MoleculeViewer';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState<string>('Aspirin');
  const [inputType, setInputType] = useState<InputType>('name');
  const [sdfData, setSdfData] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<MoleculeMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [visualizationStyle, setVisualizationStyle] = useState<VisualizationStyle>('stick');
  const [spin, setSpin] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('#555');
  const [error, setError] = useState<string | null>(null);

  const handleRender = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    setLoading(true);
    setError(null);
    setSdfData(null);
    setMetadata(null);

    try {
      const result = await fetchMoleculeData(inputValue, inputType);
      setSdfData(result.sdf);
      setMetadata(result.metadata);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header>
        <h1>Molecule Renderer</h1>
        <p>Fetch and render 3D structures from PubChem.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <form onSubmit={handleRender} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="inputType">Input Format</label>
              <select 
                id="inputType"
                value={inputType} 
                onChange={(e) => setInputType(e.target.value as InputType)}
                style={{ padding: '0.5rem' }}
              >
                <option value="name">Common Name (e.g., Aspirin)</option>
                <option value="smiles">SMILES</option>
                <option value="inchi">InChI</option>
                <option value="cid">PubChem CID</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="moleculeInput">Molecule Identifier</label>
              <input
                id="moleculeInput"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter molecule name..."
                style={{ padding: '0.5rem' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: '0.75rem', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Fetching...' : 'Render Molecule'}
            </button>
          </form>

          {error && (
            <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#ef4545ff', borderRadius: '4px' }}>
              {error}
            </div>
          )}
          
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            <strong>Try these:</strong>
            <ul>
              <li>Name: Caffeine</li>
              <li>SMILES: C1=CC=C(C=C1)C=O (Benzaldehyde)</li>
              <li>CID: 2244 (Aspirin)</li>
            </ul>
          </div>

          {/* Rendering Settings - Moved to Sidebar */}
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#333' }}>Display Settings</h3>
            
            {/* Style Selection */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold', color: '#555' }}>Style</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {(['stick', 'sphere', 'line'] as VisualizationStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setVisualizationStyle(style)}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      fontSize: '0.85rem',
                      backgroundColor: visualizationStyle === style ? '#646cff' : 'white',
                      color: visualizationStyle === style ? 'white' : '#333',
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#555' }}>
                Bg: 
                <select 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
                >
                  <option value="#f8f9fa">Light</option>
                  <option value="#555">Dark</option>
                </select>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', cursor: 'pointer', color: '#555' }}>
                <input 
                  type="checkbox" 
                  checked={spin} 
                  onChange={(e) => setSpin(e.target.checked)} 
                />
                Spin
              </label>
            </div>
          </div>
        </aside>

        <main>
          {metadata && (
            <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <h2 style={{ margin: '0 0 0.5rem 0' }}>{metadata.name}</h2>
              <div style={{ display: 'flex', gap: '1.5rem', color: '#666', fontSize: '1rem' }}>
                <span><strong>Formula:</strong> {metadata.formula}</span>
                <span><strong>MW:</strong> {metadata.molecularWeight} g/mol</span>
              </div>
            </div>
          )}
          <MoleculeViewer 
            sdfData={sdfData} 
            style={visualizationStyle} 
            spin={spin} 
            backgroundColor={backgroundColor} 
          />
          {!sdfData && !loading && !error && (
            <div style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
              Enter a molecule to view its 3D structure.
            </div>
          )}

          {metadata && (
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <h3>Molecule Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                
                <div style={{ padding: '1rem', backgroundColor: '#333', borderRadius: '8px', border: '1px solid #eee' }}>
                  <h2 style={{ marginTop: 0 }}>Identifiers</h2>
                  <p><strong>IUPAC Name:</strong><br/> {metadata.iupacName}</p>
                  <p><strong>SMILES:</strong><br/> <code style={{ fontFamily: 'monospace', wordBreak: 'break-all', display: 'block', marginTop: '0.25rem' }}>{metadata.smiles}</code></p>
                  <p><strong>InChI:</strong><br/> <code style={{ fontFamily: 'monospace', wordBreak: 'break-all', display: 'block', marginTop: '0.25rem' }}>{metadata.inchi}</code></p>
                  <p><strong>PubChem CID:</strong> {metadata.cid}</p>
                </div>

                <div style={{ padding: '1rem', backgroundColor: '#333', borderRadius: '8px', border: '1px solid #eee' }}>
                  <h2 style={{ marginTop: 0 }}>Properties</h2>
                  <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
                    <li><strong>Molecular Weight:</strong> {metadata.molecularWeight} g/mol</li>
                    <li><strong>XLogP3 (Hydrophobicity):</strong> {metadata.xLogP ?? 'N/A'}</li>
                    <li><strong>TPSA (Polar Surface Area):</strong> {metadata.tpsa ?? 'N/A'} Å²</li>
                    <li><strong>Formal Charge:</strong> {metadata.charge ?? 0}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

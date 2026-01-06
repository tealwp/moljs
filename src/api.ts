export type InputType = "name" | "smiles" | "inchi" | "cid";

export interface MoleculeMetadata {
  cid: number;
  name: string;
  smiles: string;
  inchi: string;
  formula: string;
  molecularWeight: string;
  iupacName: string;
  xLogP?: number;
  tpsa?: number;
  charge?: number;
}

export interface MoleculeData {
  sdf: string;
  metadata: MoleculeMetadata;
}

export const fetchMoleculeData = async (
  input: string,
  type: InputType
): Promise<MoleculeData> => {
  const baseUrl = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound";

  // PubChem URL construction: /compound/{identifier_type}/{identifier}/SDF?record_type=3d
  // We encode the input to handle special characters in SMILES or InChI
  const encodedInput = encodeURIComponent(input);

  const sdfUrl = `${baseUrl}/${type}/${encodedInput}/SDF?record_type=3d`;
  const propsUrl = `${baseUrl}/${type}/${encodedInput}/property/Title,MolecularFormula,CanonicalSMILES,InChI,MolecularWeight,IUPACName,XLogP,TPSA,Charge/JSON`;

  try {
    const [sdfResponse, propsResponse] = await Promise.all([
      fetch(sdfUrl),
      fetch(propsUrl),
    ]);

    if (!sdfResponse.ok) {
      if (sdfResponse.status === 404) {
        throw new Error(
          `Molecule not found or 3D structure unavailable for: ${input} as input type ${type}`
        );
      }
      throw new Error(`API Error (SDF): ${sdfResponse.statusText}`);
    }

    if (!propsResponse.ok) {
      throw new Error(`API Error (Metadata): ${propsResponse.statusText}`);
    }

    // PubChem returns the raw SDF text file
    const sdfData = await sdfResponse.text();
    const propsData = await propsResponse.json();

    const props = propsData.PropertyTable?.Properties?.[0];
    if (!props) {
      throw new Error("Failed to parse molecule properties");
    }

    return {
      sdf: sdfData,
      metadata: {
        cid: props.CID,
        name: props.Title ?? "N/A",
        smiles: props.CanonicalSMILES ?? "N/A",
        inchi: props.InChI?.replace(/^InChI=/, "") ?? "N/A",
        formula: props.MolecularFormula ?? "N/A",
        molecularWeight: props.MolecularWeight ?? "N/A",
        iupacName: props.IUPACName ?? "N/A",
        xLogP: props.XLogP,
        tpsa: props.TPSA,
        charge: props.Charge,
      },
    };
  } catch (error) {
    console.error("Failed to fetch molecule data", error);
    throw error;
  }
};

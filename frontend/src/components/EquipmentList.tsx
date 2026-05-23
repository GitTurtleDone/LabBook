import { useQuery } from "@apollo/client";
import { GET_EQUIPMENT_LIST } from "../graphql/queries";
import type { Equipment } from "../types";

interface Props {
  selectedId: string | null;
  onSelect: (eq: Equipment) => void;
}

export default function EquipmentList({ selectedId, onSelect }: Props) {
  const { loading, error, data } = useQuery<{equipmentList: Equipment[]}>(GET_EQUIPMENT_LIST);

  if (loading) return <p>Loading equipment...</p>;
  if (error) return <p className="error">Error loading equipment: {error.message}</p>;
  return (
    <div>
      <h2>Equipment List</h2>
      {data?.equipmentList.map((eq) => (
        <div 
          key={eq.id}
          className={`equipment-item ${selectedId === eq.id ? 'selected': ''}`}
          onClick = { () => onSelect(eq)}
        >
          <div className="equipment-name">
            {eq.name}
            <span>{eq.status}</span>
          </div>
          <div className="equipment-category">
            {eq.category}
          </div>
        </div>
      ))}
    </div>
  );
}

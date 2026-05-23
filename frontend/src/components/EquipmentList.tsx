import { useQuery } from "@apollo/client";
import { GET_EQUIPMENT_LIST } from "../graphql/queries";
import { Equipment } from "../types";

interface Props {
    selectedId: string | null;
    onSelect: (eq: Equipment) => void;
}

export default function EquipmentList ({selectedId, onSelect}: Props){
    const {loading, error, data} = useQuery(GET_EQUIPMENT_LIST);

}

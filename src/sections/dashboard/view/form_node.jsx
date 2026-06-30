import { MenuItem } from "@mui/material";
import { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';


export default function FormNode({ node, path = ''}) {

if (!node) return null;

const nodeName = node.name || 'root';
const type = node?.element_type?.type;
const pathField = path?`${path}.${node.name}` : node.name;
//   console.log('Rendering Node:', node.name, 'Path:', pathFeild); 

const isRequired = node.min > 0;
const baseType = node.element_type?.base || node.element_type?.restriction?.base;

if (type === 'choice') {
  return (
    <div style={{ marginLeft: 16, borderLeft: '2px solid #FFAB00', paddingLeft: 12, marginBottom: 16 }}>
      <h5>choice: {nodeName}</h5>

      {node.element_type.children?.map((group, gIdx) =>
        group.map((child, cIdx) => (
          <FormNode
            key={`${gIdx}-${cIdx}`}
            node={child}
            path={pathField}
          />
        ))
      )}
    </div>
  );
}


if (type === 'element_sequence') {
     return (
      <div style={{ marginLeft: 16, borderLeft: '1px solid #eee', paddingLeft: 10 }}>
        <h4>{node.name}</h4>
          {node.element_type.children?.map((group, gIdx) => 
            group.map((child, cIdx) => 
            (
                <FormNode
                key={`${gIdx}-${cIdx}`}
                node={child}
                path={pathField}
                />
              )
            )
         )}
        </div>
     )
}

if (type === 'simple_type' || !node.element_type){

    if (node.element_type?.enumeration)
    return (
        <RHFSelect
           sx={{ mb: 1, mt: 1 }}
           name={pathField}
           lable={node.name}
       >
        {node.element_type.enumeration.map((option)=>(
            <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
        </RHFSelect>
    )
}

if (baseType === 'boolean')
{
    return <RHFCheckbox  name={pathField} label={nodeName}/>
}


return(
    <RHFTextField
    name={pathField}
    label={nodeName}
    placeholder={node.description || ''}
    />
)
}
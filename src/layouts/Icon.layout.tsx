import React, { CSSProperties } from 'react';
import { IconHashTable } from 'types/ui.type';

type IconComponentProps = {
  className?: string;
  name: string;
  onClick?: Function;
  style?: CSSProperties;
  title?: string;
  tooltip?: string;
};

const IconTable: IconHashTable = {
  crossCircle: {
    paths: [
      'M12 20.016q3.281 0 5.648-2.367t2.367-5.648-2.367-5.648-5.648-2.367-5.648 2.367-2.367 5.648 2.367 5.648 5.648 2.367zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93zM14.578 8.016l1.406 1.406-2.578 2.578 2.578 2.578-1.406 1.406-2.578-2.578-2.578 2.578-1.406-1.406 2.578-2.578-2.578-2.578 1.406-1.406 2.578 2.578z',
    ],
    viewBox: '0 0 24 24',
  },
};

export const Icon: React.FC<IconComponentProps> = ({
  className = 'svg',
  name,
  onClick,
  title,
  style = {},
  tooltip,
}) => {
  const icon = IconTable[name] ? IconTable[name] : IconTable['goat'];
  const labelName = title ? title : name;

  return (
    <svg
      onClick={() => onClick && onClick()}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      role="img"
      aria-label={labelName}
      className={className}
      style={style}
    >
      {icon.paths.map((d: string, index: number) => (
        <path d={d} key={index} />
      ))}
      {title && <title>{tooltip}</title>}
    </svg>
  );
};

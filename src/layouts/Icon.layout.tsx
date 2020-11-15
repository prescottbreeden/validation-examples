import React, { CSSProperties } from 'react';
import { IconTable } from 'constants/Icons.const';

type IconComponentProps = {
  className?: string;
  name: string;
  onClick?: Function;
  style?: CSSProperties;
  title?: string;
  tooltip?: string;
};

export const Icon: React.FC<IconComponentProps> = ({
  className = "svg", name, onClick, title, style = {}, tooltip
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

import { isDefined } from "utils/helper";

interface ConditionProps {
  isValid: boolean;
  children: any;
  fallback?: any;
}

const Condition = ({ isValid, children, fallback = null }: ConditionProps) =>
  isValid ? children : isDefined(fallback) ? fallback : undefined;

export default Condition;

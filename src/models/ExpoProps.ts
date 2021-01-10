import {ErrorRecoveryProps} from 'expo-error-recovery';
import {Manifest} from 'expo-updates';

export default interface IExpoProps {
  errorRecovery: ErrorRecoveryProps | null;
  manifest: Manifest;
}


import { PatientInfo } from './types';

export const DEMO_PATIENT: PatientInfo = {
  id: "883-29A",
  name: "Sarah Jenkins",
  dob: "12/04/1985",
  scanDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
};

export const HEALTHY_RETINA_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDgJlPAM88hsBSCAAYtgwH59dQHqY2muPYn1ag7v9LyZ6aLGOhABBg57VHXgM0gFgKpoRM73NFUoSNBF5skBevJWqxiEBB5y7m7ClxmGejCYLogW4WL6bnD9VZT21sio8i6cqIcErqDKoKPFHIQhj9K33ZS5A2qw12ksa9ddY4YsvbSaNO9mZbma_zTpGs9lC87tp8pNfyYZUXCakrRe-jcttteDnRKpleaic2lxV4KILAqOCYQnLvWxrRFL6533m2v1oQFiBv2DLJQ";
export const ABNORMAL_RETINA_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCuVP-dPQTWvK_KcywChUX4QbnGpyE5LTu5KPw1C5L_RASO-uAmE9jbBg-Wdn-zJ304YOn-d228vMk66d5PwjsBYAAg2WIDCXUccC435zq0qj2EpkeP5qvUgYftCeUySB9fLuRuumVYYey-4wULLDL-WD71QUaZCPD2Q36XcPW5ZvlAvvbEGtBGc1icsMXYdIanP5Ue6BNVgrbhHC1EOqg-3FB_Mjmof4FlWkl4qmGs3RPU2RzqtoO3Y4hA-CNAlZ9_qKXD9r3hXM9e";

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  UserPlus,
  Car,
  MessageCircle,
  FileCheck,
  Info,
} from 'lucide-react';
import { Driver } from '../types';

interface AdminDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  drivers: Driver[];
  activeDriverIds: Set<string>;
  onToggleDriverVisibility: (id: string) => void;
}

export const AdminDriverModal: React.FC<AdminDriverModalProps> = ({
  isOpen,
  onClose,
  drivers,
  activeDriverIds,
  onToggleDriverVisibility,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'roster' | 'onboarding'>('roster');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto border border-gray-150">
        {/* Header */}
        <div className="p-6 bg-gray-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400">
                Administrator Portal
              </span>
              <h2 className="text-xl font-bold tracking-tight">
                Freelance Driver Directory Control
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-100 bg-gray-50 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('roster')}
            className={`pb-3 px-4 font-bold text-xs border-b-2 transition-colors ${
              activeTab === 'roster'
                ? 'border-[#E53E5C] text-[#E53E5C]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Driver Roster ({drivers.length})
          </button>
          <button
            onClick={() => setActiveTab('onboarding')}
            className={`pb-3 px-4 font-bold text-xs border-b-2 transition-colors ${
              activeTab === 'onboarding'
                ? 'border-[#E53E5C] text-[#E53E5C]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Manual Onboarding Protocol
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto grow space-y-4">
          {activeTab === 'roster' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-500 pb-2">
                <span>
                  Admin manually controls which drivers are visible on the public BaliFinder directory.
                </span>
                <span className="font-semibold text-gray-800">
                  {activeDriverIds.size} visible of {drivers.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {drivers.map((driver) => {
                  const isVisible = activeDriverIds.has(driver.id);
                  return (
                    <div
                      key={driver.id}
                      className="p-3.5 rounded-2xl border border-gray-150 flex items-center justify-between gap-3 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={driver.profileImage}
                          alt={driver.name}
                          className="w-11 h-11 rounded-xl object-cover border border-gray-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-gray-900">
                              {driver.name}
                            </h4>
                            <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-md">
                              {driver.community}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                            <span>{driver.vehicleType}</span>
                            <span>•</span>
                            <span className="text-[#25D366] font-medium">
                              WA: {driver.whatsappDisplay}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleDriverVisibility(driver.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isVisible
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          {isVisible ? (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Live on Web</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Hidden</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-amber-950 mb-1">
                    Manual Admin Onboarding Model
                  </h4>
                  <p>
                    Drivers do not register accounts or use passwords. BaliFinder administrators manually interview each freelance driver in person in Bali, verify their documents, inspect their vehicle, and publish their public profile directly.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 space-y-2">
                  <FileCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-sm text-gray-900">
                    1. Identity & Police Check
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Indonesian KTP identity card verification, clean police background certificate (SKCK), and active professional driving license (SIM A Umum).
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 space-y-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-sm text-gray-900">
                    2. Vehicle Inspection
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Vehicles must be under 5 years old, feature dual air conditioning, pass tire tread depth test, and maintain pristine cleanliness.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 space-y-2">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <h4 className="font-bold text-sm text-gray-900">
                    3. WhatsApp Responsiveness
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Drivers must maintain a 90%+ rapid response rate on WhatsApp and adhere to upfront, transparent pricing without hidden tourist surcharges.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 space-y-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  <h4 className="font-bold text-sm text-gray-900">
                    4. Community Association
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Affiliation with recognized regional driver cooperatives (Blangsinga, Denpasar, Jimbaran, Saba, Ubud) ensures peer accountability.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Admin Session: Authorized</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

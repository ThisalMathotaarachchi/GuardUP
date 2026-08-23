import { useState } from 'react';
import { X } from 'lucide-react';
import GuardUpAvatar from './GuardUpAvatar';
import { GUARDUP_AVATARS } from '../../data/avatars';

const AvatarPickerModal = ({ open, currentId, onClose, onSave }) => {
  const [selected, setSelected] = useState(currentId);

  if (!open) return null;

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <div className="gu-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="avatar-modal-title">
      <div className="gu-modal auth-glass">
        <div className="gu-modal__header">
          <h2 id="avatar-modal-title" className="text-lg font-bold text-[#111827]">Choose your GuardUP avatar</h2>
          <button type="button" onClick={onClose} className="gu-modal__close" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="gu-modal__body">
          <div className="gu-avatar-grid">
            {GUARDUP_AVATARS.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setSelected(avatar.id)}
                className={`gu-avatar-grid__item ${selected === avatar.id ? 'gu-avatar-grid__item--selected' : ''}`}
                title={avatar.label}
              >
                <GuardUpAvatar avatarId={avatar.id} size={56} />
                <span>{avatar.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="gu-modal__footer">
          <button type="button" onClick={onClose} className="btn-secondary py-2 px-4 text-sm">Cancel</button>
          <button type="button" onClick={handleSave} className="btn-primary py-2 px-4 text-sm">Done</button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPickerModal;
